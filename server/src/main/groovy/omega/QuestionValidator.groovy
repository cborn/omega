package omega

class QuestionValidator {

    static Optional<String> validate(QuestionResponse response, Question question) {
        if(response != null) {
            switch (question.type) {
                case QuestionType.BOOLEAN:
                    return validateForBoolean(response.question, response)
                case QuestionType.BLOCK_TEXT:
                    return Optional.empty()
                case QuestionType.CLOZE:
                    return validateForCloze(response.question, response)
                case QuestionType.DATE:
                    return validateForDate(response.question, response)
                case QuestionType.DROPDOWN:
                    return validateForDropdown(response.question, response)
                case QuestionType.LONG_TEXT:
                    return validateForLongText(response.question, response)
                case QuestionType.MULTI_CHOICE:
                    return validateForMultiChoice(response.question, response)
                case QuestionType.NUMBER:
                    return validateForNumber(response.question, response)
                case QuestionType.PICTURE_CHOICE:
                    return validateForPictureChoice(response.question, response)
                case QuestionType.SCALE:
                    return validateForScale(response.question, response)
                case QuestionType.SHORT_TEXT:
                    return validateForShortText(response.question, response)
                case QuestionType.VOICE:
                    return validateForVoice(response.question, response)
                default:
                    return Optional.empty()
            }
        }

        return Optional.empty()
    }

    static Optional<String> validateForScale(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForPictureChoice(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForNumber(Question question, QuestionResponse questionResponse) {

        println "Number validation"
        if(question.custom_properties.containsKey(Question.QuestionPropertyKeys.MAX.key_name))
        {
            if(Integer.parseInt(questionResponse.response) > Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MAX.key_name)))
            {
                return Optional.of("Question (" + (question.position + 1) + ") " + question.name + " value cannot be greater than " + Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MAX.key_name)))
            }
        }

        if(question.custom_properties.containsKey(Question.QuestionPropertyKeys.MIN.key_name))
        {
            if(Integer.parseInt(questionResponse.response) < Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MIN.key_name)))
            {
                return Optional.of("Question (" + (question.position + 1) + ") " + question.name + " value cannot be less than " + Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MIN.key_name)))
            }
        }


        return Optional.empty()
    }

    static Optional<String> validateForMultiChoice(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForLongText(Question question, QuestionResponse questionResponse) {

        if(question.custom_properties.containsKey(Question.QuestionPropertyKeys.MAX_CHARS.key_name))
        {
            if(questionResponse.response.length() > Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MAX_CHARS.key_name)))
            {
                return Optional.of("Question (" + (question.position + 1) + ") " + question.name + " cannot have more than " + Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MAX_CHARS.key_name)) +" characters")
            }
        }

        return Optional.empty()
    }

    static Optional<String> validateForDropdown(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForDate(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForShortText(Question question, QuestionResponse questionResponse) {

        if(question.custom_properties.containsKey(Question.QuestionPropertyKeys.MAX_CHARS.key_name))
        {
            if(questionResponse.response.length() > Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MAX_CHARS.key_name)))
            {
                return Optional.of("Question (" + (question.position + 1) + ") " + question.name + " cannot have more than " + Integer.parseInt(question.custom_properties.get(Question.QuestionPropertyKeys.MAX_CHARS.key_name)) +" characters")
            }
        }

        return Optional.empty()
    }

    static Optional<String> validateForVoice(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForBoolean(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }

    static Optional<String> validateForCloze(Question question, QuestionResponse questionResponse) {
        return Optional.empty()
    }


}
