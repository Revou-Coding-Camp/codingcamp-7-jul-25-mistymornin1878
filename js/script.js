const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const emptyList = document.getElementById('emptyList');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterDropdownBtn = document.getElementById('filterDropdownBtn');
const filterOptions = document.getElementById('filterOptions');
const btnHariIni = document.getElementById('btnHariIni');
const btnBesok = document.getElementById('btnBesok');

addTodoBtn.addEventListener('click', tambahAktivitas);
todoList.addEventListener('click', kelolaAktivitas);
deleteAllBtn.addEventListener('click', hapusSemuaAktivitas);
filterOptions.addEventListener('click', filterAktivitas);
btnHariIni.addEventListener('click', setTanggalHariIni);
btnBesok.addEventListener('click', setTanggalBesok);

function tambahAktivitas() {
    const teksAktivitas = todoInput.value;
    const tanggalTenggat = dateInput.value;

    if (teksAktivitas.trim() === "") {
        alert("Harap masukkan nama aktivitas terlebih dahulu!");
        return;
    }

    const barisBaru = `
        <tr>
            <td>${teksAktivitas}</td>
            <td>${tanggalTenggat || 'Tidak diatur'}</td>
            <td><span class="badge bg-warning">Belum Selesai</span></td>
            <td>
                <button class="btn btn-danger btn-sm">Hapus</button>
            </td>
        </tr>
    `;

    todoList.innerHTML += barisBaru;
    todoInput.value = "";
    dateInput.value = "";
    emptyList.style.display = 'none';
}

function kelolaAktivitas(event) {
    const itemYangDiklik = event.target;

    if (itemYangDiklik.classList.contains('btn-danger')) {
        const barisAktivitas = itemYangDiklik.parentElement.parentElement;
        barisAktivitas.remove();
        if (todoList.children.length === 0) {
            emptyList.style.display = 'block';
        }
    } else if (itemYangDiklik.classList.contains('badge')) {
        const barisAktivitas = itemYangDiklik.parentElement.parentElement;
        if (itemYangDiklik.classList.contains('bg-warning')) {
            itemYangDiklik.classList.remove('bg-warning');
            itemYangDiklik.classList.add('bg-success');
            itemYangDiklik.textContent = 'Selesai';
            barisAktivitas.classList.add('tugas-selesai');
        } else {
            itemYangDiklik.classList.remove('bg-success');
            itemYangDiklik.classList.add('bg-warning');
            itemYangDiklik.textContent = 'Belum Selesai';
            barisAktivitas.classList.remove('tugas-selesai');
        }
    }
}

function hapusSemuaAktivitas() {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus semua aktivitas?");
    if (konfirmasi) {
        todoList.innerHTML = "";
        emptyList.style.display = 'block';
    }
}

function filterAktivitas(event) {
    const statusFilter = event.target.dataset.filter;
    const teksTombol = event.target.textContent;

    if (!statusFilter) return;

    filterDropdownBtn.textContent = `Filter: ${teksTombol.replace('Tampilkan ', '')}`;

    const semuaBaris = todoList.querySelectorAll('tr');
    semuaBaris.forEach(baris => {
        const statusBadge = baris.querySelector('.badge');
        
        switch (statusFilter) {
            case 'semua':
                baris.style.display = 'table-row';
                break;
            case 'selesai':
                if (statusBadge.classList.contains('bg-success')) {
                    baris.style.display = 'table-row';
                } else {
                    baris.style.display = 'none';
                }
                break;
            case 'belum':
                if (statusBadge.classList.contains('bg-warning')) {
                    baris.style.display = 'table-row';
                } else {
                    baris.style.display = 'none';
                }
                break;
        }
    });
}

function formatTanggal(date) {
    const tahun = date.getFullYear();
    const bulan = (date.getMonth() + 1).toString().padStart(2, '0');
    const hari = date.getDate().toString().padStart(2, '0');
    return `${tahun}-${bulan}-${hari}`;
}

function setTanggalHariIni() {
    dateInput.value = formatTanggal(new Date());
}

function setTanggalBesok() {
    const besok = new Date();
    besok.setDate(besok.getDate() + 1);
    dateInput.value = formatTanggal(besok);
}