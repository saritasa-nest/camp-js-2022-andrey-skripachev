type EnumValue = string | number | symbol;

export type EnumMapper<T extends EnumValue, R extends EnumValue> = Readonly<Record<T, R>>;
