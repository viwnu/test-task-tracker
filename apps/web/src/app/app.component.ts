import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'web';
  msg = signal<string | null>(null);
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getHello().subscribe((res) => this.msg.set(res.message));
  }
}
