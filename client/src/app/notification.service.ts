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
            data: { alertText: alertText }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if ( handler != null) {
                handler();
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
        @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}

    dismiss(): void {
        this.dialogRef.close();
    }

}
