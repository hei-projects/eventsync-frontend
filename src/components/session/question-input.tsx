"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { User, Send, MessageCircleQuestionMark } from "lucide-react";

type Props = {
  className?: string;
  onSubmit?: (data: { question: string; name?: string }) => Promise<void>;
};

export const QuestionInput = ({ className, onSubmit }: Props) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className={cn("w-full max-w-2xl", className)}
      onSubmit={async (e) => {
        e.preventDefault();

        if (!onSubmit) return;

        const formData = new FormData(e.currentTarget);
        const question = formData.get("question") as string;
        const name = formData.get("name") as string | undefined;

        if (!question.trim()) return;

        setSubmitting(true);

        await onSubmit({
          question: question.trim(),
          name: name?.trim() || undefined,
        });

        setSubmitting(false);
        (e.target as HTMLFormElement).reset();
      }}
    >
      <Card className="shadow-xl border border-gray-100 bg-[#6D53CA] backdrop-blur-sm">
        <CardContent className="space-y-6">
          {/* Champ Nom */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-[16px] font-bold text-white flex items-center gap-2"
            >
              <User className="w-6 h-6" />
              Votre nom
              <span className="text-white text-xs">(optionnel)</span>
            </label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Entrez votre nom"
              className="max-w-3xl h-12 text-base"
            />
          </div>

          {/* Champ Question */}
          <div className="space-y-2">
            <label
              htmlFor="question"
              className="text-[16px] font-bold text-white flex items-center gap-2"
            >
              <MessageCircleQuestionMark className="w-6 h-6" />
              Votre question
            </label>

            <Textarea
              id="question"
              name="question"
              placeholder="Posez votre question ici..."
              rows={5}
              className="resize-y min-h-[140px] text-base"
              required
            />
          </div>

          {/* Bouton Envoyer */}
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto px-10 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            {submitting ? "Envoi..." : "Envoyer la question"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};