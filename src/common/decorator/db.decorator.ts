import { Column } from 'typeorm';
import { applyDecorators } from '@nestjs/common';

class ColumnNumericTransformer {
	to(data: number): number {
		return data;
	}

	from(data: string): number {
		if (!data) return null;
		if (Number.isNaN(data)) return null;
		return parseFloat(data);
	}
}

// Use this decorator to define a text column in a database table
export const TextColumn = () => {
	return applyDecorators(Column('varchar'));
};

// Use this decorator to define a long text column (more than 256 characters) in a database table
export const LongTextColumn = () => {
	return applyDecorators(Column('longtext'));
};

// Use this decorator to define a integer column in a database table
export const IntColumn = () => {
	return applyDecorators(Column('int'));
};

// Use this decorator to define a boolean column in a database table
export const BooleanColumn = () => {
	return applyDecorators(Column('boolean'));
};

// Use this decorator to define a datetime column in a database table
export const DatetimeColumn = () => {
	return applyDecorators(Column('datetime'));
};

// Use this decorator to define a json column in a database table
export const JsonColumn = () => {
	return applyDecorators(Column('json'));
};

// Use this decorator to define a numeric column in a database table
export const NumericColumn = (precision?: number, scale?: number) => {
	const p = precision || 10;
	const s = scale || 2;
	return applyDecorators(
		Column('numeric', {
			precision: p,
			scale: 2,
			transformer: new ColumnNumericTransformer(),
		}),
	);
};
