function TodayInfo() {
  const today = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = weekdays[today.getDay()];
  const dateString = today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="text-right">
      <p className="text-sm font-medium">{dayName}</p>
      <p className="text-xs text-gray-500">{dateString}</p>
    </div>
  );
}

export default TodayInfo;
