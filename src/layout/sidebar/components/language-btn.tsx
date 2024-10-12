import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SidebarBtn from './sidebar-btn';

function LanguageSelector() {
    const { i18n } = useTranslation();
    const { t: tLayout } = useTranslation('layout');
    const [language, setLanguage] = useState(i18n.language);
    const languages = ['bg', 'en'];
    let languageIndex = languages.indexOf(language);

    const handleClick = () => {
        if (languageIndex + 1 > languages.length - 1) {
            languageIndex = 0;
        } else languageIndex++;

        setLanguage(languages[languageIndex]);
        localStorage.setItem('language', languages[languageIndex]);
        i18n.changeLanguage(languages[languageIndex]);
    };

    return <SidebarBtn onClick={handleClick} icon="globe" text={tLayout("header.language")} />;
}

export default LanguageSelector;