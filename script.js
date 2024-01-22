document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    let selectedDates = [currentDate];
    let calendarGrid = document.getElementById('calendarData');
    let selectedDate = document.getElementById('selectedDates')
    

    function markCurrentDate() {
        const dateCells = document.querySelectorAll('.date');
        dateCells.forEach(dateCell => {
            const date = new Date(dateCell.getAttribute('data-date'));
            if (date.toDateString() === currentDate.toDateString()) {
                dateCell.parentElement.classList.add('selected');
            }
        });
    }


    // to generate calender
    function generateCalendarData() {
        const weeks = [];
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        let currentDay = startDate;
        let week = [];

        for (let i = 0; i < currentDay.getDay(); i++) {
            week.push(null);
        }

        while (currentDay <= endDate) {
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
            week.push(new Date(currentDay));
            currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);
        }


        while (week.length < 7) {
            week.push(null);
        }


        const isCurrentDay = currentDay.toDateString() === new Date().toDateString();

        weeks.push(week);


        calendarGrid.innerHTML = weeks.map((week, weekIndex) => `
           <tr key="${weekIndex}">
          ${week.map((day, dayIndex) => `
            <td
              key="${dayIndex}"
              class="${day ? (selectedDates.some(selectedDate => selectedDate.getTime() === day.getTime()) ? 'selected' : '') : 'empty'}" 
            >
              ${day ? `<span class="date" data-date="${day.toISOString()}">${day.getDate()}</span>` : ''}
            </td>
          `).join('')}
        </tr>
      `).join('');


        document.querySelectorAll('.date').forEach(dateElement => {
            dateElement.addEventListener('click', () => handleDateClick(dateElement.getAttribute('data-date')));
        });

        markCurrentDate()

    }

    function handlePrevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendarData();
    }

    function handleNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendarData();
    }

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    //
    function handleDateClick(dateString) {
        const date = new Date(dateString);
        const isSelected = selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString());


        if (isSelected) {
            selectedDates = selectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime());
        } else {
            selectedDates.push(date);
            selectedDate.textContent = `[${selectedDates.map(date => formatDate(date)).join(', ')}]`;

        }

        generateCalendarData();
    }

    document.getElementById('prevMonth').addEventListener('click', handlePrevMonth);
    document.getElementById('nextMonth').addEventListener('click', handleNextMonth);

    generateCalendarData();
});
