import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	appState: ArticleStateType;
	setAppState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	appState,
	setAppState,
}: ArticleParamsFormProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [fontFamily, setfontFamily] = useState(appState.fontFamilyOption);
	const [fontColor, setfontColor] = useState(appState.fontColor);
	const [backgroundColor, setbackgroundColor] = useState(
		appState.backgroundColor
	);
	const [contentWidth, setcontentWidth] = useState(appState.contentWidth);
	const [fontSize, setfontSize] = useState(appState.fontSizeOption);

	const sidebarContainerRef = useRef<HTMLDivElement>(null);

	const toggleOpenSidebar = () => setSidebarOpen((open) => !open);

	const resetForm = () => {
		setAppState(defaultArticleState);
		setfontFamily(defaultArticleState.fontFamilyOption);
		setfontColor(defaultArticleState.fontColor);
		setbackgroundColor(defaultArticleState.backgroundColor);
		setcontentWidth(defaultArticleState.contentWidth);
		setfontSize(defaultArticleState.fontSizeOption);
		toggleOpenSidebar();
	};

	const submitForm = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
		setAppState({
			...appState,
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
		toggleOpenSidebar();
	};

	const ClickOutside = (event: MouseEvent) => {
		event.stopPropagation();
		if (
			sidebarContainerRef.current &&
			!sidebarContainerRef.current?.contains(event.target as Node)
		) {
			setSidebarOpen(false);
		}
	};

	useEffect(() => {
		if (sidebarOpen) document.addEventListener('mousedown', ClickOutside);
		else document.removeEventListener('mousedown', ClickOutside);
		return () => document.removeEventListener('mousedown', ClickOutside);
	}, [sidebarOpen]);

	return (
		<div ref={sidebarContainerRef}>
			<ArrowButton open={sidebarOpen} onClick={toggleOpenSidebar} />
			<aside
				className={clsx(
					styles.container,
					sidebarOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setfontFamily}></Select>
					<RadioGroup
						name='рАЗМЕР шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setfontSize}
						title='рАЗМЕР шрифта'></RadioGroup>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setfontColor}></Select>
					<Separator></Separator>
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setbackgroundColor}></Select>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setcontentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
