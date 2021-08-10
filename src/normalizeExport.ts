export default function normalizeExport(exportedValue: any): any {
	return exportedValue.__esModule ? exportedValue.default : exportedValue;
}