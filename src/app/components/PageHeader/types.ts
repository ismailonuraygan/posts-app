import { ReactNode } from 'react'

export interface PageHeaderProps {
	/**
	 * The title of the page.
	 * @default undefined
	 * @type string
	 */
	title: string;

	/**
	 * Supporting text of header.
	 * @default undefined
	 * @type string
	 */
	supportingText?: string;

	/**
	 * Extra support text.
	 * @default undefined
	 * @type string
	 */
	extraSupportingText?: string;

	/**
	 * Children of header.
	 * @default undefined
	 * @type ReactNode
	 */
	children?: ReactNode;

	/**
	 * Centered section of header.
	 * @default false
	 * @type boolean
	 */
	isCentered?: boolean;

	/**
	 * Border bottom section of header.
	 * @default true
	 * @type boolean
	 */
	hasBorderBottom?: boolean;
}
