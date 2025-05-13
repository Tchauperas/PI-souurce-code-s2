document.querySelectorAll(".filter").forEach(input => {
    input.addEventListener("keyup", function() {
        let columnIndex = this.dataset.column;
        let filterValue = this.value.toLowerCase();
        let tableRows = document.querySelectorAll("tbody tr");

        tableRows.forEach(row => {
            let cell = row.cells[columnIndex];
            if (cell) {
                row.style.display = cell.textContent.toLowerCase().includes(filterValue) ? "" : "none";
            }
        });
    });
});