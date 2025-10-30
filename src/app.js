document.addEventListener('alpine:init', () => {
    Alpine.data('layanan', () => ({
        items: [
            { id: 1, name: 'Cinematography Film', img: '1.jpg', price: 250000}
            { id: 1, name: 'Photography Wedding', img: '2.jpg', price: 200000}
            { id: 1, name: 'Drone View', img: '3.jpg', price: 150000}
        ],

    }));
});