import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router";
import axiosClient from '../API/axiosClient';



const problemSchema = z.object({

    title: z.string().min(2, "Title is required"),
    description: z.string().min(3, "Description is required"),
    difficulty: z.enum(["easy", "medium", "hard"]),
    tags: z.enum([
        "LinkedList",
        "Graph",
        "Dynamic Programming",
        "Stack",
        "Queue",
        "Array",
        'Math'
    ]),

  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().min(1, "Explanation is required"),
      })
    )
    .min(1, "At least one visible test case required"),

  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one hidden test case required"),

    startCode: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        initialCode: z.string().min(1, "Initial code is required"),
      })
    )
    .length(3, "All three languages required"),

    referenceSolution: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        completeCode: z.string().min(1, "Complete code is required"),
      })
    )
    .length(3, "All three languages required"),
});



function UpdateProblem() {

  const { id } = useParams(); // get problem id from route
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
//   const [problem, setProblem] = useState(null)

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(problemSchema),
        defaultValues: {
            title: "",
            description: "",
            difficulty: "easy",
            tags: "Array",
            visibleTestCases: [],
            hiddenTestCases: [],
            startCode: [
                { language: "C++", initialCode: "" },
                { language: "Java", initialCode: "" },
                { language: "JavaScript", initialCode: "" },
            ],
            referenceSolution: [
                { language: "C++", completeCode: "" },
                { language: "Java", completeCode: "" },
                { language: "JavaScript", completeCode: "" },
            ],
        },
    });

    // Manage dynamic fields
    const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({ control, name: "visibleTestCases" });
    const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({ control, name: "hiddenTestCases" });


    useEffect(() => {

        const fetchProblem = async () => {

            try {
                const res = await axiosClient.get(`/problem/problemById/${id}`);
                reset(res.data); 
   
            } catch (err) {
                alert("Failed to fetch problem: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id, reset]);


    // useEffect(() => {
    //     console.log("Validation errors:", errors);
    // }, [errors]);


    const onSubmit = async (data) => {


        try {
            
            await axiosClient.put(`/problem/update/${id}`, data);
            alert("Problem updated successfully!");
            navigate(`/`);

        } catch (error) {
            alert(
                `Error updating problem: ${error.response?.data?.message || error.message}`
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (

        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Update Problem</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Basic Information */}
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4"><u>Basic Information</u></h2>
                    <div className="space-y-4">
                        <div className="form-control">
                        <label className="label block mt-4">Title</label>
                        <input
                            {...register("title")}
                            className={`ml-6 mt-2 h-18 w-full input input-bordered ${ errors.title && "input-error" } h-12`}
                        />
                            {errors.title && (
                                <span className="text-error">{errors.title.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label block mt-4">Description</label>

                            <textarea
                                {...register("description")}
                                className={`ml-6 mt-2 textarea textarea-bordered h-64 w-full ${ errors.description && "textarea-error"}`}
                            />

                            {errors.description && (
                                <span className="text-error">{errors.description.message}</span>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">

                            <div className="form-control w-1/2">
                                <label className="label">Difficulty</label>
                                <select {...register("difficulty")} className="select select-bordered ml-2">
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div className="form-control w-1/2">
                                
                                <label className="label">Tag</label>
                                <select {...register("tags")} className="select select-bordered ml-4">
                                    <option value="Array">Array</option>
                                    <option value="LinkedList">Linked List</option>
                                    <option value="Graph">Graph</option>
                                    <option value="Dynamic Programming">DP</option>
                                    <option value="Stack">Stack</option>
                                    <option value="Queue">Queue</option>
                                    <option value="Math">Math</option>
                                    {/* <option value="Queue">Queue</option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visible & Hidden Test Cases (same as create page) */}
                <div className="card bg-base-100 shadow-lg p-6">

                    <h2 className="text-xl font-semibold mb-4"><u>Test Cases</u></h2>
                    {/* Visible */}
                    <div className="space-y-4 mb-6">

                        <div className="flex justify-between items-center">
                        <h3 className="font-medium">Visible Test Cases</h3>
                        <button
                            type="button"
                            onClick={() =>
                                appendVisible({ input: "", output: "", explanation: "" })
                            }
                            className="btn btn-sm bg-green-500"
                        >
                            Add Visible Case
                        </button>
                        </div>

                        {visibleFields.map((field, index) => (

                            <div key={field.id} className="border p-4 rounded-lg space-y-2">
                                
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removeVisible(index)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <input
                                    {...register(`visibleTestCases.${index}.input`)}
                                    placeholder="Input"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    {...register(`visibleTestCases.${index}.output`)}
                                    placeholder="Output"
                                    className="input input-bordered w-full"
                                />
                                <textarea
                                    {...register(`visibleTestCases.${index}.explanation`)}
                                    placeholder="Explanation"
                                    className="textarea textarea-bordered w-full"
                                />
                            </div>
                        ))}

                    </div>

                    {/* Hidden */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">Hidden Test Cases</h3>
                            <button
                                type="button"
                                onClick={() => appendHidden({ input: "", output: "" })}
                                className="btn btn-sm bg-green-500"
                            >
                                Add Hidden Case
                            </button>
                        </div>
                        
                        {hiddenFields.map((field, index) => (
                            <div key={field.id} className="border p-4 rounded-lg space-y-2">
                                <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => removeHidden(index)}
                                    className="btn btn-xs btn-error"
                                >
                                    Remove
                                </button>
                                </div>
                                <input
                                    {...register(`hiddenTestCases.${index}.input`)}
                                    placeholder="Input"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    {...register(`hiddenTestCases.${index}.output`)}
                                    placeholder="Output"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Templates (same as create page) */}
                <div className="card bg-base-100 shadow-lg p-6">

                    <h2 className="text-xl font-semibold"><u>Code Templates</u></h2>
                    <div className="space-y-6">

                        {[0, 1, 2].map((index) => (
                            <div key={index} className="space-y-2 pt-18">
                                <h3 className="font-medium">
                                {index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"}
                                </h3>

                                <div className="form-control">
                                    <label className="label">Initial Code</label>
                                    <textarea
                                        {...register(`startCode.${index}.initialCode`)}
                                        className="textarea textarea-bordered w-full font-mono h-60"
                                        rows={6}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">Reference Solution</label>
                                    <textarea
                                        {...register(`referenceSolution.${index}.completeCode`)}
                                        className="textarea textarea-bordered w-full font-mono h-86"
                                        rows={6}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type='submit' className="btn w-3xs items-center bg-cyan-500">
                Update Problem
                </button>

            </form>
        </div>
    );
}

export default UpdateProblem;
