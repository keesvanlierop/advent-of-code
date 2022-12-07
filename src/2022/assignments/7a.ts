import { add, readList } from '@/utils'

type Directory = {
    type: 'dir'
    name: string
    contents: Record<string, File | Directory>
}

type File = {
    type: 'file'
    name: string
    size: number
}

const MAX_DIRECTORY_SIZE = 100000

export const getDirectories = (list: string[]) => {
    const filesystem: Record<string, Directory> = {}

    let currentDirectory: string = '/root'

    list.forEach(row => {
        const [first, second, third] = row.split(' ')

        if (first === '$') {
            if (second === 'cd') {
                if (third === '..') {
                    const parts = currentDirectory.split('/')
                    parts.pop()
                    currentDirectory = parts.join('/')
                } else if (third === '/') {
                    currentDirectory = '/root'
                } else {
                    currentDirectory = `${currentDirectory}/${third}`
                }

                if (!filesystem[currentDirectory]) {
                    filesystem[currentDirectory] = {
                        type: 'dir',
                        name: currentDirectory,
                        contents: {}
                    }
                }
            }
        } else if (first === 'dir') {
            const directoryPath = `${currentDirectory}/${second}`
            if (!filesystem[directoryPath]) {
                filesystem[directoryPath] = {
                    type: 'dir',
                    name: directoryPath,
                    contents: {}
                }
            }
            filesystem[currentDirectory].contents[directoryPath] = filesystem[directoryPath]
        } else if (first === 'ls') {
            // meh not really any use for this
        } else {
            const size = Number(first)
            filesystem[currentDirectory].contents[second] = {
                type: 'file',
                name: second,
                size
            }
        }
    })

    return filesystem
} 

const getTotalSizesForDirectories = (directories: Record<string, Directory>): Record<string, number> => {
    return Object.values(directories)
        .reduce(
            (directories, directory) => ({
                ...directories,
                [directory.name]: getDirectorySize(directory)
            }),
            {}
        )
}

const getDirectorySize = (directory: Directory): number => 
    Object.values(directory.contents).reduce((total, fileOrDirectory) => {
        const size = fileOrDirectory.type === 'file' 
            ? fileOrDirectory.size
            : getDirectorySize(fileOrDirectory)
        return total + size
    }, 0)

const run = async () => {
	const list = await readList('7.txt')

    const directories = getDirectories(list)
    const totalSizesForDirectories = getTotalSizesForDirectories(directories)

	console.log(
		`The answer for 7a is: ${add(Object.values(totalSizesForDirectories).filter(size => size <= MAX_DIRECTORY_SIZE))}`,
	)
}

run()
