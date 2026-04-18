from moviepy.editor import VideoFileClip 
import os

def extract_audio_from_video(video_path, audio_path):
    try:
        video = VideoFileClip(video_path)
        audio = video.audio
        audio.write_audiofile(audio_path)
        video.close()
        audio.close()
        print(f"Audio extracted and saved to {audio_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

source_video = input("Enter the path to the video file: ")
video_name = source_video.split("/")[-1].split(".")[0]

if not os.path.exists("audios"):
    os.makedirs("audios")

output_audio = "audios/" + video_name + ".mp3"
extract_audio_from_video(source_video, output_audio)
