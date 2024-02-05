import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'canvas-test',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    public context: CanvasRenderingContext2D | null | undefined;

    ngAfterViewInit(): void {
        this.context = this.canvas!.nativeElement.getContext('2d');

    }
}
