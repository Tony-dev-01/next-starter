"use client"

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale) => {
    // Extract the path without any locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(en|fr-CA)/, '') || '/';
    // Always add the new locale prefix
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        {locale === 'en' ? 'EN' : 'FR'}
        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
        <li>
          <button
            onClick={() => switchLocale('en')}
            className={locale === 'en' ? 'active' : ''}
          >
            English
          </button>
        </li>
        <li>
          <button
            onClick={() => switchLocale('fr-CA')}
            className={locale === 'fr-CA' ? 'active' : ''}
          >
            Français
          </button>
        </li>
      </ul>
    </div>
  );
}