import {Component, EventEmitter, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/internal/Observable';


export interface AlertDialogData {
    alertText: string;
}


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private dialog: MatDialog) {
    }

    open = false;


    reloadRequiredObserver = new EventEmitter();



    publishAlert(alertText, handler?) {
        if (this.open) {
            return;
        }

        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '250px',
            data: {alertText: alertText}
        });

        this.open = true;

        dialogRef.afterClosed().subscribe(result => {
            this.open = false;
           if (handler != null) {
                handler();
            }
        });
    }


    publishConfirmation(alertText, onConfirm?, onNotConfirm?) {
        if (this.open) {
            return;
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            data: {alertText: alertText}
        });
        this.open = true;

        dialogRef.afterClosed().subscribe(result => {
            this.open = false;
            if (onConfirm != null && result) {
                onConfirm();
            } else if (onNotConfirm != null) {
                onNotConfirm();
            }
        });
    }

    doesRequireReload() {
        this.reloadRequiredObserver.emit(true);
    }


}

@Component({
    selector: 'app-alert-dialog',
    templateUrl: '../dialogs/dialog-alert-dialog.html',
})
export class AlertDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {
    }

    dismiss(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: '../dialogs/dialog-confirm-dialog.html',
})
export class ConfirmDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {
    }

    dismiss(): void {
        this.dialogRef.close();
    }

}
