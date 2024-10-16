import Circle from "./circle";

function Circles() {
    return (
        <>
            <Circle
                height='h-[100%]'
                width='w-[100%]'
                color='bg-slate-800'
            />
            <Circle
                height='h-[80%]'
                width='w-[70%]'
                round='rounded-[3rem]'
                animation='animate-gradient'
                delay='delay-100'
                color='bg-green-800'
                pos1='top-[-12%]'
                pos2='right-[-12%]'
            />
            <Circle
                height='h-[50%]'
                width='w-[75%]'
                color='bg-green-800'
                round='rounded-[3rem]'
                animation='animate-gradient'
                delay='delay-200'
                pos1='bottom-[-10%]'
                pos2='left-[-5%]'
            />
            <Circle
                height='h-[65%]'
                width='w-[80%]'
                color="bg-black"
                round='rounded-[3rem]'
                animation='animate-gradient'
                delay='delay-300'
                pos1='bottom-[-15%]'
                pos2='right-[-20%]'
            />
            <Circle
                height='h-[70%]'
                width='w-[65%]'
                color="bg-black"
                round='rounded-[3rem]'
                animation='animate-gradient'
                delay='delay-400'
                pos1='top-[-10%]'
                pos2='left-[-5%]'
            />
        </>
    );
}

export default Circles;