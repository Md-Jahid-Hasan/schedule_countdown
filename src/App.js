import React, {useEffect, useState} from 'react'
import items from './data'

const other_data = {
    isFinished: true,
    scheduleTask: []
}

function App() {
    const [work, setWork] = useState(items)
    const [minute, setMinute] = useState('_ _')
    const [second, setSecond] = useState('_ _')
    const [schedule, setSchedule] = useState(other_data)


    useEffect(() => {
        console.log("Hello world 2")
        let timer = null
        if (second > 0) {
            timer = setInterval(() => setSecond(second - 1), 1000)
        } else if (second === 0 && minute > 0) {
            setMinute(minute - 1)
            setSecond(60)
        } else if (second === 0 && minute === 0) {
            setMinute('_ _')
            setSecond('_ _')
            if (schedule.scheduleTask.length > 0) {
                const task = schedule.scheduleTask.pop()
                setMinute(work[task].time - 1)
                setSecond(59)
            } else {
                setSchedule({...schedule, isFinished: true})
            }
        }

        return () => clearInterval(timer)
    }, [second])

    const handleButton = (id) => {
        console.log(id);
        console.log("Button clicked")
        if (schedule.isFinished === true) {
            setMinute(work[id].time - 1)
            setSecond(59)
            setSchedule({...schedule, isFinished: false})
        } else {
            schedule.scheduleTask.push(id)
            console.log(schedule.scheduleTask.length)
        }
    }

    return (
        <>
            <div>
                {minute} : {second}
            </div>
            <div>
                {schedule.scheduleTask.length ? <p>Upcoming Task</p>:""}
                {schedule.scheduleTask.map(task => {
                    const {id, title, time} = work[task];
                    return (

                        <div key={id}>
                            <p>{title}</p>
                            <p>{time}</p>
                        </div>
                    )
                })}
            </div>
            <div>
                {work.map(value => {
                    const {id, title, time} = value;
                    return (
                        <div key={id}>
                            <p>{title}</p>
                            <p>{time} min</p>
                            <button onClick={() => handleButton(id)}>Set time</button>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default App;
