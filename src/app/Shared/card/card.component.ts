import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() course!: any;
  handleMouseMove(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;
      const shadowX = (mouseX - cardRect.width / 2) / 10;
      const shadowY = (mouseY - cardRect.height / 2) / 10;
      card.style.transform = `rotateX(${-shadowY}deg) rotateY(${shadowX}deg)`;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 10px 5px var(--border), var(--border) 0px 0px 0px 1px`;
    }
  }

  handleMouseLeave(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = ''
    }
  }
}


