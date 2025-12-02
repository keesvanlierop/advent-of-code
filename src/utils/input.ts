import fs from 'fs'
import path from 'path'

const basePath = path.resolve(__dirname, '../2024/input')

export const readFile = (file: string, type = 'utf8', base = basePath): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(base, file), type, (err, data) => (err ? reject(err) : resolve(data)))
	})
}

export const readList = async (file: string, year = '2025') => {
	const basePath = path.resolve(__dirname, `../${year}/input`)
	const fileData = await readFile(file, 'utf8', basePath)
	return fileData.split('\n')
}
