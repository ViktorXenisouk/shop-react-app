import { useEffect, useState } from "react"

type TimerState = 'active' | 'reset' | 'disactive';

const useTimer = (callback: (any: any) => any,cooldown: number) => {
    const [state, setState] = useState('disactive' as TimerState)
    const [timer, setTimer] = useState(undefined as any)

    useEffect(() => {
        switch (state) {
            case 'active':
                break;
            case "disactive":
                if (timer) {
                    clearTimeout(timer)
                }
                break;
            case "reset":
                if (timer) {
                    clearTimeout(timer)
                }
                setTimer(setTimeout(callback, cooldown))
                setState('active')
                break;
        }
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [state])

    return setState
}

export { useTimer }