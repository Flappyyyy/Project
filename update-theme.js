import fs from 'fs';
import path from 'path';

const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        }
        else {
            if (file.endsWith('.jsx')) {
                filelist.push(dir + '/' + file);
            }
        }
    });
    return filelist;
};

const replaceMap = [
    [/bg-slate-50\/80/g, 'bg-pink-50/80'],
    [/bg-slate-50\/40/g, 'bg-pink-50/40'],
    [/bg-blue-50\/50/g, 'bg-rose-50/50'],
    [/bg-slate-50/g, 'bg-pink-50'],
    [/bg-slate-900/g, 'bg-rose-950'],
    [/border-slate-800/g, 'border-rose-900'],
    [/hover:bg-slate-800/g, 'hover:bg-rose-900'],
    [/text-slate-300/g, 'text-pink-100'],
    [/text-slate-400/g, 'text-pink-300'],
    [/text-slate-500/g, 'text-pink-500'],
    [/text-slate-600/g, 'text-rose-600'],
    [/text-slate-700/g, 'text-rose-700'],
    [/text-slate-800/g, 'text-rose-800'],
    [/text-slate-900/g, 'text-rose-900'],
    [/border-slate-200/g, 'border-pink-200'],
    [/border-slate-100/g, 'border-pink-100'],
    [/bg-blue-600/g, 'bg-rose-400'],
    [/hover:bg-blue-600/g, 'hover:bg-rose-500'],
    [/bg-blue-700/g, 'bg-rose-500'],
    [/hover:bg-blue-700/g, 'hover:bg-rose-600'],
    [/bg-blue-50(?!0)/g, 'bg-rose-50'],
    [/hover:bg-blue-50(?!0)/g, 'hover:bg-pink-100'],
    [/bg-blue-100/g, 'bg-pink-100'],
    [/hover:bg-blue-100/g, 'hover:bg-pink-200'],
    [/text-blue-600/g, 'text-rose-500'],
    [/hover:text-blue-600/g, 'hover:text-rose-600'],
    [/text-blue-700/g, 'text-rose-600'],
    [/hover:text-blue-700/g, 'hover:text-rose-700'],
    [/text-blue-800/g, 'text-rose-700'],
    [/border-blue-200/g, 'border-rose-200'],
    [/border-blue-600/g, 'border-rose-400'],
    [/focus:ring-blue-500/g, 'focus:ring-rose-400'],
    [/focus:border-blue-500/g, 'focus:border-rose-400'],
    [/ring-blue-500/g, 'ring-rose-400'],
    [/bg-slate-100/g, 'bg-pink-100'],
    [/hover:bg-slate-100/g, 'hover:bg-pink-200'],
    [/border-blue-100/g, 'border-rose-100'],
    [/hover:bg-slate-50/g, 'hover:bg-pink-50'],
];

const files = walkSync('./src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    replaceMap.forEach(([regex, replacement]) => {
        content = content.replace(regex, replacement);
    });
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
