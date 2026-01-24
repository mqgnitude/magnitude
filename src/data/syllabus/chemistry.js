export const chemistry = [
    // TIER 1: The Foundation
    {
        id: "chem_atom",
        title: "Atomic Structure",
        type: "core",
        row: 1,
        col: 2,
        status: "unlocked", // Changed to unlocked so you can click it
        description: "Protons, neutrons, and the architecture of matter.",

        // THE LESSON DATA
        lesson: {
            sections: [
                {
                    id: 1,
                    type: "text",
                    content: "Atoms are the building blocks of the universe. They consist of a dense nucleus surrounded by a orbiting of electrons."
                },
                {
                    id: 2,
                    type: "image",
                    // For now we use a placeholder, later we import real assets
                    src: "/images/atom.png",
                    caption: "Nuclear model of an Atom"
                },
                {
                    id: 3,
                    type: "interactive",
                    title: "Subatomic Particles",
                    data: [
                        { label: "Proton", charge: "+1", mass: "1" },
                        { label: "Neutron", charge: "0", mass: "1" },
                        { label: "Electron", charge: "-1", mass: "1/1840" }
                    ]
                },
                {
                    id: 4,
                    type: "checkpoint",
                    question: "Which particle resides in the outer shells?",
                    options: ["Proton", "Neutron", "Electron"],
                    correct: 2 // Index of 'Electron'
                }
            ]
        }
    },

    // TIER 2: The Branching (Requires Tier 1)
    {
        id: "chem_periodic",
        title: "Periodic Table",
        type: "branch",
        row: 2,
        col: 1, // Left
        status: "unlocked",
        requires: ["chem_atom"],
        description: "Trends, groups, and periodicity."
    },
    {
        id: "chem_bonding",
        title: "Bonding",
        type: "branch",
        row: 2,
        col: 3, // Right
        status: "locked",
        requires: ["chem_atom"],
        description: "Ionic, covalent, and metallic bonds."
    },

    // TIER 3: The Deep Dive
    {
        id: "chem_quant",
        title: "Quantitative",
        type: "boss",
        row: 3,
        col: 2, // Back to Center
        status: "locked",
        requires: ["chem_periodic", "chem_bonding"], // Needs BOTH branches
        description: "Moles, calculations, and yield."
    }
];