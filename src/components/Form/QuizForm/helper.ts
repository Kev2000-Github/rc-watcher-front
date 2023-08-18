import { QuizForm } from "../../../services/interface"
import { QuizFormSchema } from "./schema"

export const generateDefaultValues = (quiz: QuizForm) => {
    const data: QuizFormSchema = {}
    for(const question of quiz.Questions){
        if(question.isMultiple){
            data[question.id] = {selectionId: []}
        }
        else{
            data[question.id] = {selectionId: undefined}
        }
    }
    return data
}