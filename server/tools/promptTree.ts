
interface Prompt {
    id: string;
    prompt: string;
    answer: string;
    children?: Prompt[];
}

const promptTree: Prompt[] = [
    {
        id: "1",
        prompt: "Geht es um ein Gerät?",
        answer: "Sehr schön aber sag was dein gerät ist",
        children: [
            {
                id: "1.1",
                prompt: "Cleanbug",
                answer: "blablabal",
                children: [
                    {
                        id: "1.1.1",
                        prompt: "Stürzt treppen ab?",
                        answer: "Tja pech gehabt",
                    },
                    {
                        id: "1.1.2",
                        prompt: "Probleme bei Konfiguration?",
                        answer: "Tja pech gehabt",
                    }
                ]
            },
            {
                id: "1.2",
                prompt: "Windowfly",
                answer: "blablabal",
                children: [
                    {
                        id: "1.2.1",
                        prompt: "Saugt sich an fenstern fest?",
                        answer: "Tja pech gehabt",
                    },
                    {
                        id: "1.2.2",
                        prompt: "Probleme bei Konfiguration?",
                        answer: "Tja pech gehabt",
                    }
                ]
            },
            {
                id: "1.3",
                prompt: "Gardenbeetle",
                answer: "blablabal",
                children: [
                    {
                        id: "1.3.1",
                        prompt: "Lässt den Rasen liegen?",
                        answer: "Tja pech gehabt",
                    },
                    {
                        id: "1.3.2",
                        prompt: "Probleme bei Konfiguration?",
                        answer: "Tja pech gehabt",
                    },
                ]
            },
            {
                id: "1.4",
                prompt: "Anderes Gerät",
                answer: "blablabal",
                children: [
                    {
                        id: "1.4.2",
                        prompt: "Probleme bei Konfiguration?",
                        answer: "Tja pech gehabt",
                    }
                ]
            },
        ]
    },
    {
        id: "2",
        prompt: "Irgendwas mit lieferung",
        answer: "schöne lieferung",
    },
    {
        id: "3",
        prompt: "Support ist schlecht",
        answer: "wow tut mir so leid",
    }
]

export {promptTree, type Prompt}