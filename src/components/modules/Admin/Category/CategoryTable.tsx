"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getEventCategories } from "@/services/eventCategory.services";
import { IEventCategory } from "@/types/event.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategoryColumns } from "./categoryColumns";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CategoryTable = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<IEventCategory | null>(
    null
  );
  const [deletingCategory, setDeletingCategory] = useState<IEventCategory | null>(
    null
  );

  const { data: categoryResponse, isFetching } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
  });

  const categories = categoryResponse?.data ?? [];

  const columns = getCategoryColumns({
    onEdit: (category) => setEditingCategory(category),
    onDelete: (category) => setDeletingCategory(category),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Category
        </Button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        isLoading={isFetching}
        emptyMessage="No event categories found."
      />

      <CreateCategoryModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      <UpdateCategoryModal
        category={editingCategory}
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
      />

      <DeleteCategoryModal
        category={deletingCategory}
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
      />
    </div>
  );
};

export default CategoryTable;
