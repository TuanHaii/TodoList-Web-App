package com.example.todolist.filter;

import com.example.todolist.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthfilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    // Constructor thủ công thay vì @AllArgsConstructor
    public JwtAuthfilter(UserDetailsService userDetailsService, JwtService jwtService) {
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    // Getters for the fields if needed
    public UserDetailsService getUserDetailsService() { return userDetailsService; }
    public JwtService getJwtService() { return jwtService; }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);// bỏ "Bearer "
            try {
                username = jwtService.extractUsername(token);// lấy username từ token
            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                // Token đã hết hạn - log và tiếp tục mà không authenticate
                System.out.println("JWT Token đã hết hạn: " + e.getMessage());
                filterChain.doFilter(request, response);
                return;
            } catch (Exception e) {
                // Token không hợp lệ - log và tiếp tục mà không authenticate
                System.out.println("JWT Token không hợp lệ: " + e.getMessage());
                filterChain.doFilter(request, response);
                return;
            }
        }

        //xác thực người dùng nếu chưa được xác thực
        //Trong SecurityContextHolder đã có Authentication chưa? (nếu chưa thì mới xác thực).
        //Load user từ DB bằng userDetailsService.loadUserByUsername(username).
        //Gọi jwtService.validateToken(token, userDetails) để check:
        //Token có hợp lệ không (chữ ký đúng, chưa hết hạn).
        //Username trong token có trùng với DB không.
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                var userDetails = userDetailsService.loadUserByUsername(username);
                if(jwtService.validateToken(token, userDetails)) {
                    //Tạo UsernamePasswordAuthenticationToken (object này đại diện cho user đã đăng nhập).
                    //Gán vào SecurityContextHolder.
                    //Từ giờ, trong suốt lifecycle của request → Spring Security biết user nào đang gọi API, với quyền gì (authorities/roles).
                   UsernamePasswordAuthenticationToken authToken =
                           new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                   authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                   SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (Exception e) {
                // Xử lý lỗi khi load user hoặc validate token
                System.out.println("Lỗi xác thực user: " + e.getMessage());
            }
        }
        // cho request tiếp tục đi qua các filter khác
        filterChain.doFilter(request, response);
    }
}
