import matplotlib.pyplot as plt
import utils

df = utils.load_merged_data()


investor_owned_df = df[df["investor_owned"] & (df["permit_type"] != "unknown")]

# Group by both permit_type and neighborhood, then sum declared_valuation for each group.
total_spend_per_permit_type_neighborhood = (
    investor_owned_df.groupby(["permit_type", "neighborhood"])["declared_valuation"]
    .mean()
    .reset_index()
)

# Pivot the table to have permit_types as columns and neighborhoods as rows for easier plotting.
pivot_table = total_spend_per_permit_type_neighborhood.pivot(
    index="neighborhood", columns="permit_type", values="declared_valuation"
).fillna(0)

# sort by spend
pivot_table["total"] = pivot_table.sum(axis=1)
pivot_table = pivot_table.sort_values("total", ascending=False).drop(columns="total")

# Plotting
pivot_table.plot(kind="bar", figsize=(14, 8), colormap="viridis")
plt.xlabel("Neighborhood")
plt.ylabel("Average Spend ($)")
plt.title("Average Spend for Each Kind of Investor-Owned Permit by Neighborhood")
plt.xticks(rotation=45, ha="right")
plt.legend(title="Work Type")
plt.tight_layout()
plt.show()
