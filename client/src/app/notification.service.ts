import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';


export interface AlertDialogData {
    alertText: string;
}


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private dialog: MatDialog) {
    }


    publishAlert(alertText, handler?) {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '250px',
            data: {alertText: alertText}
        });

        dialogRef.afterClosed().subscribe(result => {
           if (handler != null) {
                handler();
            }
        });
    }


    publishConfirmation(alertText, onConfirm?, onNotConfirm?) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            data: {alertText: alertText}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (onConfirm != null && result) {
                onConfirm();
            } else if (onNotConfirm != null) {
                onNotConfirm();
            }
        });
    }


}

@Component({
    selector: 'app-alert-dialog',
    templateUrl: 'dialog-alert-dialog.html',
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
    selector: 'app-alert-dialog',
    templateUrl: 'dialog-confirm-dialog.html',
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
