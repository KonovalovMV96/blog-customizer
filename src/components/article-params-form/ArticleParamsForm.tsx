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
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [fontFamily, setfontFamily] = useState(articleState.fontFamilyOption);
	const [fontColor, setfontColor] = useState(articleState.fontColor);
	const [backgroundColor, setbackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setcontentWidth] = useState(articleState.contentWidth);
	const [fontSize, setfontSize] = useState(articleState.fontSizeOption);

	const sidebarContainerRef = useRef<HTMLDivElement>(null);

	const toggleOpenSidebar = () => setSidebarOpen((open) => !open);

	const resetForm = () => {
		setArticleState(defaultArticleState);
		setfontFamily(defaultArticleState.fontFamilyOption);
		setfontColor(defaultArticleState.fontColor);
		setbackgroundColor(defaultArticleState.backgroundColor);
		setcontentWidth(defaultArticleState.contentWidth);
		setfontSize(defaultArticleState.fontSizeOption);
		toggleOpenSidebar();
	};

	const submitForm = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
		toggleOpenSidebar();
	};

	const сlickOutside = (event: MouseEvent) => {
		event.stopPropagation();
		if (
			sidebarContainerRef.current &&
			!sidebarContainerRef.current?.contains(event.target as Node)
		) {
			setSidebarOpen(false);
		}
	};

	useEffect(() => {
		if (sidebarOpen) document.addEventListener('mousedown', сlickOutside);
		else document.removeEventListener('mousedown', сlickOutside);
		return () => document.removeEventListener('mousedown', сlickOutside);
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
						onChange={setfontFamily}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setfontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setfontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setbackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setcontentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
