import axios from "axios";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RepoCard({ repo }: { repo: any }) {
    const [languages, setLanguages] = useState<string[]>([]);
    const [lang1, setLang1] = useState<number>(0);
    const [lang2, setLang2] = useState<number>(0);
    const [lang3, setLang3] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(repo.languages_url);
            const arr: any[] = Object.values(data);
            const keys: string[] = Object.keys(data);
            if (keys.length <= 3)
                setLanguages(keys);
            else {
                const x = keys.slice(0, 3);
                setLanguages(x);
            }
            if (arr.length > 0) {
                let total = 0;
                arr.forEach((ele: any) => { total += ele });
                setLang1(arr[0] * 100 / total);
                if (arr.length > 1)
                    setLang2(arr[1] * 100 / total);
                if (arr.length > 2)
                    setLang3(arr[2] * 100 / total);
            }
        }
        fetchData();
    }, []);

    return (
        <div key={nanoid()} className="h-max w-[60%] p-4 bg-white rounded-lg">
            <p className="font-medium text-blue-600 cursor-pointer" onClick={() => router.push(repo.html_url)}>{repo.name}</p>
            <p className="w-full h-[6px] relative overflow-hidden rounded-lg">
                <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${lang1}%`,
                    backgroundColor: "blue"
                }}></span>
                <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 2,
                    height: '100%',
                    width: `${lang2}%`,
                    backgroundColor: "yellow"
                }}></span>
                <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: `${lang3}%`,
                    backgroundColor: "red"
                }}></span>
            </p>
            <div key={nanoid()} className="flex flex-col justify-start items-start gap-2 mt-3">
                {languages.map((lang, index) => (
                    <div key={index} className="flex justify-center items-center gap-2">
                        <p className={`h-1 w-1 bg-${index === 0 ? 'blue-700' : index === 1 ? 'yellow-300' : 'red-700'} rounded-lg`}></p>
                        <p className="text-sm">{lang}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
