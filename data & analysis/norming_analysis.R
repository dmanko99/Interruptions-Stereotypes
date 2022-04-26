# Analysis scripts:#
## Norming stimuli for main study: interruptions and racialized/gendered judgments ##
## preregistered at https://osf.io/7g6k5 ##

#Set-up and reading in data#
library("tidyverse") # for all things tidyverse
library("dplyr")
library("pwr")
library("lme4")
library("brms")
library("lmerTest")
library("ggplot2")
library("bootstrap")
library("tm")

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

#Read in data
##experimental trial data
df <- read_csv("int_norming/data/int_norming/int_norming-trials.csv") %>%
  # remove non-relevant columns
  select( -c(proliferate.condition,
             slide_number,
             image,
             slide_type,
             error)) %>%
  # removing bot check slides
  drop_na()

##subject information data
subinfo <-read.csv("int_norming/data/int-norming/int-norming-subject_information.csv",
                   header = TRUE)

#Helper scripts
dodge = position_dodge(.9)
theta <- function(x, xdata, na.rm=T) {
  mean(xdata[x],
       na.rm = na.rm)
  }
ci.low <- function(x,na.rm=T) {
  mean(x, na.rm = na.rm) - 
    quantile(
      bootstrap(
        1:length(x),
        1000,
        theta,
        x,
        na.rm = na.rm)$thetastar,
      .025,
      na.rm = na.rm)
  }
ci.high <- function(x,na.rm=T) {
  quantile(
    bootstrap(
      1:length(x),
      1000,
      theta,
      x,
      na.rm = na.rm)$thetastar,
    .975,
    na.rm = na.rm) - mean(x, na.rm = na.rm)
  }

#Sample size calculation:  check to see what the optimal sample size is
pwr.anova.test(k = 4,
               f = 0.4, #effect size that we would be happy about
               sig.level = 0.05,
               power = 0.8) %>% 
  plot()

# sanity check: should equal 50
length(unique(df_norming$workerid))

# checking mean completion time
mean(read.csv("int_norming/data/int-norming/int-norming-time_in_minutes.csv",
              header = TRUE)$time_in_minutes)

# formatting data
df_norming$response = as.numeric(df_norming$response)
## removing path from stims
df_norming$audio = sub('stims\\/audio_stims\\/',
                       '', df_norming$audio)
df_norming$face = sub('stims\\/face_stims\\/[wb][mf]faces\\/',
                       '', df_norming$face)
## separating `race/gender` into both race and gender
df_norming <- df_norming %>% 
  separate(`race/gender`,
           c("gender", "race"),
           sep = "_",
           remove = FALSE)
  
  

# setting up relevant dataframes
df.aggregated <- df_norming %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response),
            CILow = ci.low(response),
            CIHigh = ci.high(response))

df.aggregated_byrace <- df_norming %>% 
  group_by(condition, `race/gender`) %>% 
  summarize(avg_response = mean(response),
            CILow = ci.low(response),
            CIHigh = ci.high(response)) %>% 
  pivot_wider(names_from = condition,
              values_from = c(avg_response,
                              CILow,
                              CIHigh))

df.white_female <- df_norming %>% 
  filter(`race/gender` == "female_white") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response),
            CILow = ci.low(response),
            CIHigh = ci.high(response))

df.black_female <- df_norming %>% 
  filter(`race/gender` == "female_black") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response),
            CILow = ci.low(response),
            CIHigh = ci.high(response))

df.black_male <- df_norming %>% 
  filter(`race/gender` == "male_white") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response),
            CILow = ci.low(response),
            CIHigh = ci.high(response))

df.white_male <- df_norming %>% 
  filter(`race/gender` == "male_black") %>% 
  group_by(condition) %>% 
  summarize(avg_response = mean(response),
            CILow = ci.low(response),
            CIHigh = ci.high(response))


# performing t-tests for aggregate and each race/gender condition
## comparing match condition to mismatch condition
t.test(df.aggregated$avg_response ~ df.aggregated$condition)
t.test(df.female$avg_response ~ df.white_female$condition)
t.test(df.black_male$avg_response ~ df.black_male$condition)
t.test(df.white_male$avg_response ~ df.white_male$condition)


#mixed effects model
norming_model_general <- brm(response ~ condition + race + gender +
                               (1 | workerid) + (1 | face) + (1 | audio),
                             data = df_norming)
summary(norming_model_general)

norming_model_max <- brm(response ~ condition + race + gender + race*gender +
                           (1 | workerid) + (1 | face) + (1 | audio),
                         data = df_norming)
summary(norming_model_max)
