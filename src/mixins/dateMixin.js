export default {
  methods: {
    dateFilter(value, format = "date") {
      const options = {};

      if (format.includes("date")) {
        options.day = "2-digit";
        options.month = "2-digit";
        options.year = "numeric";
      }

      if (format.includes("time")) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }

      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
    timeElapsed(value) {
      const time = {};
      const current = new Date();
      const diff = current - value;
      time.years = current.getFullYear();
      time.months = ~~(
        diff.getFullYear() * 12 -
        current.getMonth() +
        value.getMonth()
      );
      time.weeks = ~~(diff / 604800000);
      time.days = ~~(diff / 86400000);
      time.minutes = ~~(this.diff / 86400000);
      time.names = {
        year: ["год", "года", "лет"],
        month: ["месяц", "месяца", "месяцев"],
        day: ["день", "дня", "дней"],
        hour: ["час", "часа", "часов"],
        minute: ["минута", "минуты", "минут"],
        second: ["секунда", "секунды", "секунд"],
      };
    },
  },
};
