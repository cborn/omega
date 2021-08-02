package omega;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

class LessonPageExtract {

    LessonPageExtract(LessonPage page) {
        // Lesson page to extract.

        this.name = page.name;
        this.pageOrder = page.pageOrder;
        this.dueDate = page.dueDate;
        this.status = page.status;

        for(def question in page.questions) {

            QuestionExtract qExtract = new QuestionExtract(question);
            this.questions.add(qExtract);

        }





    }


    String name;

    int pageOrder;

    Date dueDate;

    LessonPageStatus status = LessonPageStatus.DRAFT;

    List<QuestionExtract> questions = new ArrayList<>();

}
