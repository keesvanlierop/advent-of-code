import fs from 'fs'
import path from 'path'

const basePath = path.resolve(__dirname, '../2021/input')

export const readFile = (file: string, type = 'utf8'): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(basePath, file), type, (err, data) =>
			err ? reject(err) : resolve(data),
		)
	})
}

export const readList = async (file: string) => {
	const fileData = await readFile(file)
	return fileData.split('\n')
}
