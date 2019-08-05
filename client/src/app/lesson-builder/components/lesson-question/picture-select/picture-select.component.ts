import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';
import {HttpClient} from '@angular/common/http';
import {LessonBuilderService} from '../../../lesson-builder.service';
import {environment} from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-picture-select',
    templateUrl: './picture-select.component.html',
    styleUrls: ['./picture-select.component.css']
})
export class PictureSelectComponent implements OnInit {

    @Input() question: Question;

    environment = environment;

    selectedFile: File;

    imageLoading = false;


    workingCopy;

    constructor(private lessonBuilderService: LessonBuilderService) {
    }

    ngOnInit() {

        if (this.question.custom_properties.images === undefined) {
            this.question.custom_properties.images = '';
        }

        this.workingCopy = this.question.custom_properties.images;

    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.onUpload();
    }

    async onUpload() {
        this.imageLoading = true;

        const promise = await this.lessonBuilderService.addImageToQuestion(this.question, this.selectedFile);

        promise.subscribe(value => {
            this.imageLoading = false;
            // new image on question...
            this.question = value;
            this.workingCopy = this.question.custom_properties.images;
        }, error1 => {
            this.imageLoading = false;
        });

    }

    async removeImage(image) {
        const promise = await this.lessonBuilderService.removeImageToQuestion(this.question, image);

        promise.subscribe(value => {
            // new image on question...
            this.question = value;
            this.workingCopy = this.question.custom_properties.images;
        });
    }

}
