package com.example.todolist.config;

import com.example.todolist.filter.JwtAuthfilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthfilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;
    private final CorsConfigurationSource corsConfigurationSource;

    // Constructor thủ công thay vì @AllArgsConstructor
    public SecurityConfig(JwtAuthfilter jwtAuthFilter, UserDetailsService userDetailsService, CorsConfigurationSource corsConfigurationSource) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    //Main Security
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                // Cho phép các endpoint public truy cập tự do
                .requestMatchers("/api/auth/**", "/api/public/**", "/login", "/register", "/", "/health", "/actuator/**", "/css/**", "/js/**", "/images/**").permitAll()
                // Các endpoint còn lại yêu cầu xác thực
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults())
            .formLogin(form -> form.disable());

        // Thêm JWT filter vào filter chain
        http.addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    //Hashing password
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // thuc hien logic xác thực người dùng
    /*
    - khi người dùng nhập username và password, Spring Security sẽ đóng gói vào 1 object UsernamePasswordAuthenticationToken
    - Gọi UserdetailsService để load user theo username từ DB
    - So sánh password nhập vào với password trong DB (đã mã hóa)
    - Nếu khớp, trả về Authentication object với thông tin user đã xác thực
    - Nếu không khớp, ném exception xác thực thất bại

    * */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService); // Cung cấp cách load user từ DB
        provider.setPasswordEncoder(passwordEncoder()); // Cung cấp cách mã hóa và so sánh
        return provider;
    }
//    lấy AuthenticationManager từ Spring Security (thông qua AuthenticationConfiguration).
//    Đăng ký nó làm bean, để bạn có thể inject vào controller / service và gọi authenticate(...) khi cần xác thực user.
    @Bean
    public AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

}
