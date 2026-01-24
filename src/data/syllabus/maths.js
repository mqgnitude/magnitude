export const maths = [
    // --- TRACK 1: ALGEBRA (Column 1) ---
    {
        id: "alg_basics",
        title: "Basic Algebra",
        row: 1, col: 1,
        status: "locked",
        type: "core",
        description: "Solving linear equations and rearranging formulae."
    },
    {
        id: "alg_quad",
        title: "Quadratics",
        row: 2, col: 1,
        status: "locked",
        requires: ["alg_basics"],
        type: "core"
    },

    // --- TRACK 2: NUMBER (Column 2) ---
    {
        id: "num_frac",
        title: "Fractions",
        row: 1, col: 2,
        status: "locked",
        type: "core"
    },

    // --- TRACK 3: GEOMETRY (Column 3) ---

    // VECTORS 1.1: The Foundation

    {
        id: "vec_1_1",
        title: "Vectors 1.1",
        row: 1, col: 3,
        status: "unlocked",
        type: "core",
        description: "Notation, column vectors, and the difference between scalar and vector quantities.",

        // --- GENUINE LESSON CONTENT ---
        lesson: {
            sections: [
                {
                    id: 1,
                    type: "text",
                    content: "Most things in life are 'Scalars'. They have magnitude (size) only. For example: '5kg of sugar' or '30°C heat'."
                },
                {
                    id: 2,
                    type: "image",
                    // Concept: Showing a speedometer (Scalar) vs a GPS arrow (Vector)
                    src: "/images/3-speedometer.png",
                    caption: "A Speedometer is 𝙎𝙘𝙖𝙡𝙖𝙧."
                },
                {
                    id: 3,
                    type: "text",
                    content: "Vectors have both Magnitude 𝙖𝙣𝙙 Direction. We represent them mathematically using Column Vectors."
                },
                {
                    id: 4,
                    type: "image",
                    // Concept: Showing a speedometer (Scalar) vs a GPS arrow (Vector)
                    src: "/images/2-vectorarrow.png",
                    caption: "An arrow - which has direction - is a 𝙑𝙚𝙘𝙩𝙤𝙧."
                },
                {
                    id: 5,
                    type: "interactive",
                    title: "Reading Column Vectors:",
                    data: [
                        { label: "Top Number (x)", charge: "Right (+)", mass: "Left (-)" },
                        { label: "Bottom Number (y)", charge: "Up (+)", mass: "Down (-)" }
                    ]
                },
                {
                    id: 6,
                    type: "checkpoint",
                    question: "Which vector describes a movement of 3 𝙪𝙣𝙞𝙩𝙨 𝙇𝙚𝙛𝙩 and 2 𝙪𝙣𝙞𝙩𝙨 𝙐𝙥?",
                    options: [
                        "Top: 3, Bottom: 2",
                        "Top: -3, Bottom: 2",
                        "Top: 3, Bottom: -2"
                    ],
                    correct: 1 // -3 means Left, 2 means Up
                }
            ]
        }
    },

    // VECTORS 1.2: Arithmetic (Locked until 1.1 is done)
    {
        id: "vec_1_2",
        title: "Vectors 1.2",
        row: 2, col: 3,
        status: "locked",
        requires: ["vec_1_1"],
        type: "core",
        description: "Adding, subtracting and multiplying vectors geometrically.",

        // The Hero Game is attached here as the reward for finishing the basics
        heroGame: {
            id: "vector_piggy", // <--- Updated ID
            title: "Piggy Algebra",
            type: "physics_puzzle",
            unlocked: true
        }
    },

    // VECTORS 1.3: Advanced (Magnitude)
    {
        id: "vec_1_3",
        title: "Vectors 1.3",
        row: 3, col: 3,
        status: "locked",
        type: "core"
    }
];