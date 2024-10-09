interface CircleProps {
    height: string;
    width: string;
    color: string;
    pos1?: string;
    pos2?: string;
    animation?: string;
    round?: string;
    delay?: string;
}

function Circle({height, width, color, round, animation, delay, pos1, pos2} : CircleProps) {
   return <div className={`absolute ${round} ${animation} ${delay} ${height} ${width} ${color} ${pos1} ${pos2}`}></div>
}

export default Circle;