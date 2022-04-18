import settings from 'constants/settings';
const commonFuc = {
  addSTTForList: (arr, start) => {
    if (!arr) {
      return [];
    }
    // Code chỗ này cũng tương tự nhue bên kia
    // Nhưng mình có thể gọi hàm này để xài lại ở nhiều nơi
    return arr.map((ele, index) => ({
      key: index,
      stt: index + 1 + start,
      ...ele,
    }));
  },

  getBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },
  
  toVietnamDay: (dayString) => {
    const daySplit = dayString.split(', ');

    const days = [];

    if (daySplit.length > 0) {
      for (const element of daySplit) {
        // eslint-disable-next-line no-unused-vars
        for (const [_, day] of Object.entries(settings.constants.DayOfWeek)) {
          if (day.key === element) {
            days.push(day.value);
          }
        }
      }
    }

    return days;
  },

};


export default commonFuc;
