import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { pollService } from "../services/poll.service";

import type { CreatePollData } from "../types/poll.types";

export default function CreatePoll() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    options: ["", ""],
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    options: "",
    general: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: "",
      content: "",
      options: "",
      general: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "O título é obrigatório";
    }

    const validOptions = formData.options.filter((opt) => opt.trim() !== "");
    if (validOptions.length < 2) {
      newErrors.options = "É necessário pelo menos 2 opções";
    }

    if (validOptions.length > 10) {
      newErrors.options = "Máximo de 10 opções permitidas";
    }

    setErrors(newErrors);

    if (
      !newErrors.title &&
      !newErrors.content &&
      !newErrors.options &&
      !newErrors.general
    ) {
      createPoll();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));

    if (errors.options) {
      setErrors((prev) => ({ ...prev, options: "" }));
    }
  };

  const addOption = () => {
    if (formData.options.length < 10) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function createPoll() {
    const validOptions = formData.options.map((o) => o.trim()).filter((o) => o !== "");

    const data: CreatePollData = {
      title: formData.title.trim(),
      content: formData.content.trim() || undefined,
      category: ("Polls" as any),
      options: validOptions,
    };

    try {
      setIsLoading(true);
      const created = await pollService.createPoll(data);
      // If backend created a post for the poll, navigate to that post.
      if (created.postId) {
        navigate(`/posts/${created.postId}`);
      } else {
        navigate("/enquetes");
      }
    } catch (error: any) {
      console.error("Erro ao criar enquete:", error);
      setErrors((prev) => ({ ...prev, general: error?.message || "Erro ao criar enquete" }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="w-full lg:w-9/12">
      <Link
        to="/enquetes"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Enquetes
      </Link>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Criar Nova Enquete</h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Título da Enquete <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Qual o melhor horário para os treinos?"
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.title ? "border-red-500" : "border-gray-700"
              }`}
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Descrição <span className="text-gray-500">(opcional)</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Adicione uma descrição para sua enquete..."
              rows={4}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                errors.content ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-400">{errors.content}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Opções de Votação <span className="text-red-400">*</span>{" "}
                <span className="text-gray-500 font-normal">
                  (mínimo 2, máximo 10)
                </span>
              </label>
            </div>

            {errors.options && (
              <p className="mb-2 text-sm text-red-400">{errors.options}</p>
            )}

            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Opção ${index + 1}`}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              ))}
            </div>

            {formData.options.length < 10 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Adicionar Opção
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-800">
            <Link
              to="/enquetes"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-lg transition border border-gray-700"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? "Criando..." : "Criar Enquete"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
