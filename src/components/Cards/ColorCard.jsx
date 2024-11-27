export function ColorCard({ name}) {
    const colors = [
        'bg-primary', 'bg-secondary', 'bg-success', 'bg-danger',
        'bg-warning', 'bg-info', 'bg-dark',
    ];

    const usedColors = [];

    const getUniqueColor = () => {
        let randomColor;
        do {
            randomColor = colors[Math.floor(Math.random() * colors.length)];
        } while (usedColors.includes(randomColor)); 
        usedColors.push(randomColor); 
        return randomColor;
    };

    const color = getUniqueColor();
    return (
        <div className={`h-500 w-5  00 m-2 rounded d-flex justify-content-center align-items-center ${color}`}>
            <h1 className="text-white text-center">{name}</h1>
        </div>
    );
}
