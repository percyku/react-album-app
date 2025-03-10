import { createContext } from "react";

export const albumInit = { albumList: [] };
// export const albumInit = {
//   albumList: [
//     {
//       id: "mEZ3PoFGs_k",
//       slug: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//       alternative_slugs: {
//         en: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         es: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         ja: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         fr: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         it: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         ko: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         de: "nahaufnahme-einer-lachelnden-frau-mEZ3PoFGs_k",
//         pt: "closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//       },
//       created_at: "2017-05-14T19:30:13Z",
//       updated_at: "2025-03-08T01:11:54Z",
//       promoted_at: "2017-05-15T08:35:06Z",
//       width: 3744,
//       height: 5616,
//       color: "#260c0c",
//       blur_hash: "LLEeV~xbKiS2_Mf+e.of9]NGrqs:",
//       description: "Happy daughter",
//       alt_description: "closeup photography of woman smiling",
//       breadcrumbs: [],
//       urls: {
//         raw: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA&ixlib=rb-4.0.3",
//         full: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA&ixlib=rb-4.0.3&q=85",
//         regular:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA&ixlib=rb-4.0.3&q=80&w=1080",
//         small:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA&ixlib=rb-4.0.3&q=80&w=400",
//         thumb:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA&ixlib=rb-4.0.3&q=80&w=200",
//         small_s3:
//           "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1494790108377-be9c29b29330",
//       },
//       links: {
//         self: "https://api.unsplash.com/photos/closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         html: "https://unsplash.com/photos/closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
//         download:
//           "https://unsplash.com/photos/mEZ3PoFGs_k/download?ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA",
//         download_location:
//           "https://api.unsplash.com/photos/mEZ3PoFGs_k/download?ixid=M3w2ODk5OTF8MHwxfHNlYXJjaHwxfHxwZW9wbGV8ZW58MHx8fHwxNzQxNDQxMjEyfDA",
//       },
//       likes: 9398,
//       liked_by_user: false,
//       current_user_collections: [],
//       sponsorship: null,
//       topic_submissions: {
//         people: {
//           status: "approved",
//           approved_on: "2020-04-06T14:20:24Z",
//         },
//       },
//       asset_type: "photo",
//       user: {
//         id: "s_l4ZYCw4EY",
//         updated_at: "2025-01-01T01:16:42Z",
//         username: "michaeldam",
//         name: "Michael Dam",
//         first_name: "Michael",
//         last_name: "Dam",
//         twitter_username: "Michael__Dam",
//         portfolio_url: null,
//         bio: null,
//         location: null,
//         links: {
//           self: "https://api.unsplash.com/users/michaeldam",
//           html: "https://unsplash.com/@michaeldam",
//           photos: "https://api.unsplash.com/users/michaeldam/photos",
//           likes: "https://api.unsplash.com/users/michaeldam/likes",
//           portfolio: "https://api.unsplash.com/users/michaeldam/portfolio",
//           following: "https://api.unsplash.com/users/michaeldam/following",
//           followers: "https://api.unsplash.com/users/michaeldam/followers",
//         },
//         profile_image: {
//           small:
//             "https://images.unsplash.com/profile-fb-1494602029-41c3d3172600.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
//           medium:
//             "https://images.unsplash.com/profile-fb-1494602029-41c3d3172600.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
//           large:
//             "https://images.unsplash.com/profile-fb-1494602029-41c3d3172600.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
//         },
//         instagram_username: null,
//         total_collections: 3,
//         total_likes: 14,
//         total_photos: 5,
//         total_promoted_photos: 3,
//         total_illustrations: 0,
//         total_promoted_illustrations: 0,
//         accepted_tos: false,
//         for_hire: false,
//         social: {
//           instagram_username: null,
//           portfolio_url: null,
//           twitter_username: "Michael__Dam",
//           paypal_email: null,
//         },
//       },
//     },
//   ],
// };
export const albumReducer = (state, action) => {
  //   console.log(action.type, action.payload);
  //   console.log(state.albumList);

  const idx = [...state.albumList].findIndex(
    (item) => item.id === action.payload.id
  );
  //   console.log(idx);
  switch (action.type) {
    case "ADD_ALBUM_TO_CART":
      if (idx === -1) {
        state.albumList.push(action.payload);
      }
      return { ...state };
    case "REMOVE_ALBUM_CART_ITEM":
      if (idx !== -1) {
        state.albumList.splice(idx, 1);
      }
      return { ...state };
    default:
      return state;
  }
};
export const AlbumContext = createContext({});
