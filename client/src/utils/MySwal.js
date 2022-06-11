import Swal from 'sweetalert2'

class MySwal {

    success(title, text) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
    }

    error(title, text) {
        Swal.fire({
            // background: '#000',
            icon: 'error',
            title: title,
            text: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
    }

    warning(title, text) {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
    }

    info(title, text) {
        Swal.fire({
            icon: 'info',
            title: title,
            text: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
    }

    question(title, text) {
        Swal.fire({
            icon: 'question',
            title: title,
            text: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
    }
}

export default new MySwal();