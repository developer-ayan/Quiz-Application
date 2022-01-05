// import React, { useState } from "react";

// import { questionProps } from "../Types/quiz_types";

// const QuestionCard: React.FC<questionProps> = ({ options, question, callBack, currentstate, quizLength }) => {

//     const [selected, setSelected] = useState("")

//     const handleSelection = (ev: any) => {
//         setSelected(ev.target.value)

//     }
//     console.log(quizLength)

//     return (
//         <div className="question-container">
//             <div>
//                 <h3>Question {currentstate + 1} / {quizLength}</h3>
//                 <p>{question}</p>
//             </div>
//             <div>
//                 <form onSubmit={(e: React.FormEvent<EventTarget>) => callBack(e, selected)}>

//                     {
//                         options.map((opt: string, ind: number) => {

//                             return (

//                                 <div key={ind}>

//                                     <label>
//                                         <input
//                                             type="radio"
//                                             name="opt"
//                                             required
//                                             value={opt}
//                                             checked={selected === opt}
//                                             onChange={handleSelection}
//                                         />
//                                         {opt}
//                                     </label>
//                                 </div>

//                             )

//                         })
//                     }
//                     <input type="submit" />
//                 </form>
//             </div>

//         </div>
//     )
// }

// export default QuestionCard;

import React, { useState } from "react"
import {
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
} from "@material-ui/core"
import { questionProps } from "../Types/quiz_types"

const QuestionCard: React.FC<questionProps> = ({
    question,
    options,
    callBack,
    currentstate,
    quizLength
}) => {
    // Answer state
    let [selectedAns, setSelectedAns] = useState("")

    // Radio
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAns(event.target.value)
    }

    return (
        <div className="questions-container">
            <h1>
                Questions  : <span className="Current-State">{++currentstate}</span> / {quizLength}
            </h1>
            <h3>{question}</h3>
            <form
                className="question-form"
                action=""
                onSubmit={(e: React.FormEvent<EventTarget>) => callBack(e, selectedAns)}
            >
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="option"
                        name="option"
                        value={selectedAns}
                        onChange={handleChange}
                        className='form-radio-group'
                    >
                        {options.map((option, index) => {
                            return (
                                <div key={index}>
                                    <FormControlLabel
                                        value={option}
                                        className="form-label"
                                        control={<Radio required={true} />}
                                        label={option}
                                    />
                                </div>
                            )
                        })}
                    </RadioGroup>
                    <input
                        className="submit-btn"
                        type="submit"
                        value="Submit"
                    />
                </FormControl>

            </form>

        </div>
    )
}

export default QuestionCard;