import { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { useTranslation } from "react-i18next";
import languagesIcon from '../../assets/languages.svg';
import closexIcon from '../../assets/closex.svg';

interface ILanguage {
    id: string,
    name: string
}

const initialLanguages: ILanguage[] = [
    {
        id: "en",
        name: "English USA"
    },
    {
        id: "es",
        name: "Spanish Español"
    },
    {
        id: "fr",
        name: "Franch Français"
    },
    {
        id: "it",
        name: "Italian Italiano"
    },
    {
        id: "de",
        name: "German Deutsch"
    },
    {
        id: "sr",
        name: "Serbian Српски"
    },
    {
        id: "ar",
        name: "Arabic العربية"
    },
    {
        id: "ru",
        name: "Russian Русский"
    },
    {
        id: "he",
        name: "Hebrew עִברִית"
    },
    {
        id: "zh",
        name: "Chinese 中文"
    },
    {
        id: "ja",
        name: "Japanese 日本語"
    }
];

const MOBILE_WIDTH_THRESHOLD = 768;

const Languages = () => {
    const { i18n } = useTranslation();
    const [isMobileVersin, setIsMobileVersion] = useState<boolean>(false);
    const [isMobilePopupOpen, setIsMobilePopupOpen] = useState<boolean>(false);

    const isMobile = () => {
        return window.innerWidth <= MOBILE_WIDTH_THRESHOLD;
    }

    useEffect(() => {
        setIsMobileVersion(isMobile());
    }, [])

    const selectLanguage = (selectedLanguageId: string) => {
        console.log("language selected", selectedLanguageId);
        i18n.changeLanguage(selectedLanguageId);
        handlePopup(false);
    }

    const desktopUI = (
        <Menu style={{ width: "150px", maxHeight: '200px', overflowY: 'auto' }}>
          {initialLanguages.map( (language: ILanguage, index: number) => (
            <Menu.Item key={index} onClick={() => selectLanguage(language.id)}>{language.name}</Menu.Item>
          ))}
        </Menu>
    );

    const handlePopup = (value: boolean) => {
        setIsMobilePopupOpen(value);
    }

    const lanugagesPopup = () => {
        return (
            <div className="languages_mobile_popup_wrapper full_center">
                <div className="languages_mobile_popup">
                    <div className='language_close_icon' onClick={() => handlePopup(false)}>
                        <img src={closexIcon} alt="X" className='close_icon' />
                    </div>
                    <div className="language_item_wrapper"> 
                        {initialLanguages.map( (language: ILanguage, index: number) => {
                            return (
                                <div key={index} className="language_item" onClick={() => selectLanguage(language.id)}>{language.name}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (isMobileVersin) {
        return (
            <div>
                <img className="language_icon" src={languagesIcon}  alt="languagesIcon" onClick={() => handlePopup(true)} />
                {isMobilePopupOpen && lanugagesPopup()}
            </div>
        )
    }

    return (
        <Dropdown overlay={desktopUI} trigger={['click']}>
            <span style={{ cursor: 'pointer' }}>
                <img className="language_icon" src={languagesIcon}  alt="languagesIcon" />
            </span>
        </Dropdown>
    );
}

export default Languages
