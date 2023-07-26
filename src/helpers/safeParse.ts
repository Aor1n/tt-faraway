import { ZodFirstPartySchemaTypes } from 'zod';

interface SafeParseProps {
  schema: ZodFirstPartySchemaTypes;
  data: unknown;
}

export const safeParse = ({ schema, data }: SafeParseProps): void => {
  const safeParseResult = schema.safeParse(data);

  if (!safeParseResult.success) {
    console.error('Response validation failed:', safeParseResult.error.message);
  }
};
