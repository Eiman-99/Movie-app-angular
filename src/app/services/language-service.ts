import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languages = ['en', 'ar', 'fr', 'zh'];
  readonly selectedLanguage = signal('en');

  changeLanguage(lang: string) {
    this.selectedLanguage.set(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
