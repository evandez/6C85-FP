import matplotlib.pyplot as plt
import seaborn as sns
import utils

df = utils.load_merged_data()
filtered_df = df[(df["investor_owned"] == True) & (df["permit_type"] != "unknown")]

# Group by neighborhood (assuming 'city' column as neighborhood) and count permits.
permit_counts = (
    filtered_df.groupby(["neighborhood", "permit_type"])["permitnumber"]
    .count()
    .reset_index(name="count")
)

# sort neighborhoods by renovation permit count
renovation_counts = permit_counts[permit_counts["permit_type"] == "renovation"]
renovation_counts = renovation_counts.sort_values(by="count", ascending=False)
renovation_neighborhoods = renovation_counts["neighborhood"].tolist()

plt.figure(figsize=(12, 8))
g = sns.barplot(
    x="neighborhood",
    y="count",
    hue="permit_type",
    data=permit_counts,
    order=renovation_neighborhoods,
    hue_order=["renovation", "maintenance"],
)
g.axes.set_xticklabels(permit_counts["neighborhood"], rotation=45, ha="right")
plt.tight_layout()
plt.show()
# Plotting
# plt.figure(figsize=(10, 6))
# plt.bar(permit_counts["neighborhood"], permit_counts["count"], color="skyblue")
# plt.xlabel("Neighborhood")
# plt.ylabel("Number of Permits")
# plt.title("Count of Investor-Owned Maintenance and Repair Permits by Neighborhood")
# plt.xticks(rotation=45, ha="right")
# plt.tight_layout()
# plt.show()
