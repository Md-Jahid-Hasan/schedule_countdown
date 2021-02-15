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
        <div className='container '>
            <div className='row col-md-12 '>
                <div className='d-flex justify-content-center mb-3'>
                    <span className="badge bg-success p-3 m-1 text-center"><p className='font-weight-bold text-center'> {minute}</p></span>
                    <span className="badge bg-success p-3 m-1"><p className='font-weight-bold'> {second}</p></span>
                </div>
                <div className='d-flex flex-column justify-content-center mb-3'>
                    <div className='row justify-content-center'>
                   
                        <div class="card" style={{maxWidth: '18rem'}}>
                        <div class="card-body text-center">
                        {schedule.scheduleTask.length ?"Upcoming Task":"No Shcedule Task"}
                        </div>
                      </div>
                        
                    </div>
                    <div className='row d-flex felx-row justify-content-center'>
                    {schedule.scheduleTask.map(task => {
                        const {id, title, time} = work[task];
                        return (

                            <div key={id} className='card text-white bg-secondary p-3 m-3' style={{maxWidth: '15rem'}}>
                                <div className='card-header'>{title}</div>
                                <div className='card-body'>{time}</div>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    {work.map(value => {
                        const {id, title, time} = value;
                        return (
                            <div key={id}  className='card text-white bg-secondary p-3 m-3' style={{maxWidth: '15rem'}}>
                                <div className='card-header'> {title}</div>
                                <div className='card-body'>{time} min</div>
                                <button className='btn btn-info m-3 mx-3' onClick={() => handleButton(id)}>Set time</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
